import type {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={"flex flex-col items-center justify-center h-screen"}>
                <div className={"text-8xl"}>

                    <h1>
                        Social Poll
                    </h1>

                </div>

                <div className={"mt-16 "}>

                    <Link href="/create-poll">
                        <button className="btn btn-ghost text-2xl">HOW TO USE?</button>
                    </Link>

                    <Link href="/create-poll">
                        <button className="btn btn-primary text-2xl">CREATE POLL</button>
                    </Link>


                </div>


            </main>

            <footer>

            </footer>
        </div>
    )
}

export default Home
