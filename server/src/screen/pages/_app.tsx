import App, { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/main.scss'

class Main extends App<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <>
                <Head>
                    <title>Flowing</title>
                    <meta name="theme-color" content="#000"/>
                    <meta name="msapplication-TileColor" content="#000"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <div className="container">
                    <Component {...pageProps}/>
                </div>
            </>
        )
    }
}

export default Main