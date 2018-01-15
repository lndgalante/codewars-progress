import fetch from 'isomorphic-fetch'
import scrapeIt from 'scrape-it'

import Kyu from '../components/Kyu'

const Index = ({ results }) => (
  <main>
    {results.map(result => <Kyu key={result.kyu} {...result} />)}

    <style jsx global>{`
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      body {
        font-weight: 400;
        font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
          'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
      }

      main {
        width: 100vw;
        min-height: 100vh;
        font-size: 24px;
        color: #212121;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #303133;
      }

      .kyu {
      }
    `}</style>
  </main>
)

Index.getInitialProps = async ({ req }) => {
  const kyus = ['8', '7', '6', '5']

  const results = await Promise.all(
    kyus.map(async kyu => {
      const resRepo = await fetch(
        `https://api.github.com/repos/lndgalante/codewars-katas/contents/${kyu}-kyu?access_token=${
          process.env.GITHUB_TOKEN
        }`
      )
      const dataRepo = await resRepo.json()

      const dataCodewars = await scrapeIt(`https://www.codewars.com/kata/search/?q=&r%5B%5D=-${kyu}&beta=false`, {
        totalKatas: {
          selector: 'p.mlx.mtn.is-gray-text',
          convert: x => x.match(/\d/g).join(''),
        },
      })

      return {
        kyu,
        done: dataRepo.length,
        total: dataCodewars.totalKatas,
      }
    })
  )

  return { results }
}

export default Index
