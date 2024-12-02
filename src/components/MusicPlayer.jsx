import { useState, useEffect, useRef } from 'react'
import {
  Box,
  IconButton,
  Slider,
  Typography,
  useTheme,
  Avatar,
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  VolumeUp,
  VolumeOff,
  Shuffle,
  Repeat,
} from '@mui/icons-material'
import { Howl } from 'howler'

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const MusicPlayer = () => {
  const theme = useTheme()
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const soundRef = useRef(null)
  const seekInterval = useRef(null)

  // Mock current song data
  const currentSong = {
    title: 'Sample Song',
    artist: 'Sample Artist',
    albumArt: 'https://via.placeholder.com/40',
    url: 'path_to_audio_file.mp3', // You'll need to add actual audio files
  }

  useEffect(() => {
    // Initialize Howler with the audio file
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [currentSong.url],
        html5: true,
        onload: () => {
          setDuration(soundRef.current.duration())
        },
        onend: () => {
          setIsPlaying(false)
          setCurrentTime(0)
          if (isRepeating) {
            playSound()
          }
        },
      })
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unload()
      }
      if (seekInterval.current) {
        clearInterval(seekInterval.current)
      }
    }
  }, [currentSong.url, isRepeating])

  const playSound = () => {
    soundRef.current.play()
    setIsPlaying(true)
    seekInterval.current = setInterval(() => {
      setCurrentTime(soundRef.current.seek())
    }, 1000)
  }

  const pauseSound = () => {
    soundRef.current.pause()
    setIsPlaying(false)
    if (seekInterval.current) {
      clearInterval(seekInterval.current)
    }
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSound()
    } else {
      playSound()
    }
  }

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue)
    soundRef.current.volume(newValue)
  }

  const handleTimeChange = (event, newValue) => {
    setCurrentTime(newValue)
    soundRef.current.seek(newValue)
  }

  const toggleMute = () => {
    if (isMuted) {
      soundRef.current.volume(volume)
    } else {
      soundRef.current.volume(0)
    }
    setIsMuted(!isMuted)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1300,
      }}
    >
      {/* Song Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
        <Avatar
          src={currentSong.albumArt}
          alt={currentSong.title}
          variant="rounded"
          sx={{ width: 40, height: 40, mr: 1 }}
        />
        <Box>
          <Typography variant="body1" noWrap>
            {currentSong.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {currentSong.artist}
          </Typography>
        </Box>
      </Box>

      {/* Player Controls */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconButton
            size="small"
            onClick={() => setIsShuffled(!isShuffled)}
            color={isShuffled ? 'primary' : 'inherit'}
          >
            <Shuffle />
          </IconButton>
          <IconButton size="small">
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={handlePlayPause} sx={{ mx: 1 }}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton size="small">
            <SkipNext />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setIsRepeating(!isRepeating)}
            color={isRepeating ? 'primary' : 'inherit'}
          >
            <Repeat />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography variant="caption" sx={{ mr: 1 }}>
            {formatTime(currentTime)}
          </Typography>
          <Slider
            size="small"
            value={currentTime}
            max={duration}
            onChange={handleTimeChange}
            sx={{ mx: 1 }}
          />
          <Typography variant="caption" sx={{ ml: 1 }}>
            {formatTime(duration)}
          </Typography>
        </Box>
      </Box>

      {/* Volume Control */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '30%', justifyContent: 'flex-end' }}>
        <IconButton size="small" onClick={toggleMute}>
          {isMuted ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
        <Slider
          size="small"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
          sx={{ width: 100, ml: 1 }}
        />
      </Box>
    </Box>
  )
}

export default MusicPlayer
