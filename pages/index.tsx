import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'

function Home() {
  return (
    <Page className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <Text variant="h1" className="text-neutral-300 opacity-90">MindMate</Text>
        <Text className="text-zinc-600 text-neutral-300 opacity-90">
          MindMateは、AIカウンセラーによる心理カウンセリング型プラットフォームです。
        </Text>
      </section>
      <section className="flex flex-col gap-3">
        <Text variant="h2" className="mb-4 text-neutral-300 opacity-90">Chat</Text>
        <div className="lg:w-full overflow-scroll opacity-90" style={{height: "464px"}}>
          <Chat />
        </div>
      </section>
    </Page>
  )
}

Home.Layout = Layout

export default Home
