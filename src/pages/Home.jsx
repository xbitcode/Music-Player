import { useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'
import { recentlyPlayed, recommendations, popularPlaylists } from '../data/mockData'

const SongCard = ({ song }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          '& .play-button': {
            opacity: 1,
          },
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={song.cover}
          alt={song.title}
          sx={{
            aspectRatio: '1',
            filter: isHovered ? 'brightness(0.7)' : 'none',
            transition: 'filter 0.3s ease',
          }}
        />
        <IconButton
          className="play-button"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
      </Box>
      <CardContent>
        <Typography variant="h6" noWrap>
          {song.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {song.artist || song.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

const Section = ({ title, items }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" sx={{ mb: 2 }}>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={3}>
          <SongCard song={item} />
        </Grid>
      ))}
    </Grid>
  </Box>
)

const Home = () => {
  return (
    <Box>
      <Section title="Recently Played" items={recentlyPlayed} />
      <Section title="Recommended for You" items={recommendations} />
      <Section title="Popular Playlists" items={popularPlaylists} />
    </Box>
  )
}

export default Home
