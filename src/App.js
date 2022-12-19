import './App.css'
import { ImagePixelated } from 'react-pixelate'
import { useEffect, useState } from 'react'

const SIZE_STEP = 2
const MAX_NUM_IMAGES = 18
const TIME_STEP_IN_SECONDS = 1

function App() {
  const [pixelSize, setPixelSize] = useState(25)
  const [imageIndex, setImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [players, setPlayers] = useState([
    { name: 'Pei', points: 0 },
    { name: 'Jo', points: 0 },
    { name: 'Xin', points: 0 },
    { name: 'Daniel', points: 0 }
  ])
  const images = []

  for (let index = 0; index < MAX_NUM_IMAGES; index++) {
    images.push(
      <ImagePixelated
        src={`/${index + 1}.jpg`}
        width={700}
        height={700}
        fillTransparencyColor={'grey'}
        pixelSize={pixelSize}
        centered
      />
    )
  }

  function nextImage() {
    if (imageIndex < MAX_NUM_IMAGES - 1) {
      setImageIndex(imageIndex + 1)
    }
    if (imageIndex === 18) {
      setImageIndex(0)
    }

    setPixelSize(25)
    setIsPaused(true)
  }

  useEffect(() => {
    if (isPaused) return

    setTimeout(() => {
      !isPaused &&
        setPixelSize(pixelSize - SIZE_STEP < 0 ? 0 : pixelSize - SIZE_STEP)
    }, TIME_STEP_IN_SECONDS * 1000)
  }, [isPaused, pixelSize])

  function increasePoints(playerIndex) {
    const playersCopy = [...players]
    playersCopy[playerIndex].points += 5
    setPlayers(playersCopy)
  }

  function decreasePoints(playerIndex) {
    const playersCopy = [...players]
    playersCopy[playerIndex].points -= 5
    setPlayers(playersCopy)
  }

  function removePlayer(playerIndex) {
    const remainingPlayers = [...players]
    remainingPlayers.splice(playerIndex, 1)
    setPlayers(remainingPlayers)
  }

  const [newPlayer, setNewPlayer] = useState('')

  function handleNewPlayer(ev) {
    setNewPlayer(ev.target.value)
  }

  function addNewPlayer() {
    if (!newPlayer) return

    setPlayers([...players, { name: newPlayer, points: 0 }])
    setNewPlayer('')
  }

  return (
    <div className='App'>
      <div className='left-column'>
        <h2 style={{ display: 'inline', minWidth: '200px' }}>Players</h2>
        <div>
          <input
            onChange={handleNewPlayer}
            value={newPlayer}
            placeholder='player name'
          />
          <button onClick={addNewPlayer}>add player</button>
        </div>
        <ul className='players-list'>
          {players.map((player, index) => (
            <li key={player.name}>
              <span>
                <button onClick={() => removePlayer(index)}>❌</button>
                {player.name}, points: {player.points}
              </span>
              <span>
                <button onClick={() => decreasePoints(index)}>-</button>
                <button onClick={() => increasePoints(index)}>+</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className='image-wrapper'>
        {images[imageIndex]}
        <div>
          <label>Pixel size: {pixelSize}px</label>
        </div>
        <div>
          <button onClick={nextImage}>next image</button>
          <button onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? 'START' : 'STOP'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
