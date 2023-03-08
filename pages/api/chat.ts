import { type NextRequest, NextResponse } from 'next/server'
import { initialMessages } from '../../components/Chat'
import { type Message } from '../../components/ChatLine'

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

// @TODO: unit test this. good case for unit testing
const generatePromptFromMessages = (messages: Message[], firstMessage: string) => {
  const messagesList: Object[] = []
  messagesList.push({ "role": "assistant", "content": firstMessage })
  messages.forEach((message) => {
    const messageObj = { "role": message.who, "content": message.message  }
    messagesList.push(messageObj)
  })
  return messagesList
}

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  // read body from request
  const body = await req.json()

  // const messages = req.body.messages
  const firstPrompt = `私は人の悩みを解決するために開発されたAI心理カウンセラーです。ここでの会話は人の悩みを解決するために行われます。`
  const messagesPrompt = generatePromptFromMessages(body.messages, firstPrompt)

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: messagesPrompt,
  }

  console.log(payload)

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }

  if (process.env.OPENAI_API_ORG) {
    requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: requestHeaders,
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  console.log(data.data)

  if (data.error) {
    console.error('OpenAI API error: ', data.error)
    return NextResponse.json({
      text: `ERROR with API integration. ${data.error.message}`,
    })
  }

  // return response with 200 and stringify json text
  return NextResponse.json({ text: data.choices[0].message.content })
}
