import colors from '../utils/colors'

export default ({ kyu, done, total }) => {
  const bgColor = colors[kyu]
  const percentage = done / total * 100

  return (
    <div>
      <p>{kyu} kyu</p>
      <p>
        {done} / {total}
      </p>
      <progress value={done} max={total}>
        {percentage} %
      </progress>

      <style jsx>{`
        div {
          width: 160px;
          height: 130px;
          margin: 1em;
          padding: 0.6em;
          border-radius: 6px;
          background-color: ${bgColor};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
        }

        progress {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
