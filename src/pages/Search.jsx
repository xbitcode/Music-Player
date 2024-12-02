import { useState } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material'
import { Search as SearchIcon, PlayArrow, Pause } from '@mui/icons-material'
import { albums, artists, recentlyPlayed as songs } from '../data/mockData'

const SearchResultCard = ({ item, type }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card
      sx={{
        display: 'flex',
        mb: 1,
        '&:hover': {
          bgcolor: 'background.elevated',
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80 }}
        image={type === 'artist' ? item.image : item.cover}
        alt={type === 'artist' ? item.name : item.title}
      />
      <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {type === 'artist' ? item.name : item.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {type === 'artist'
              ? item.followers
              : type === 'album'
              ? `${item.artist} • ${item.year}`
              : `${item.artist} • ${item.album}`}
          </Typography>
        </CardContent>
        {isHovered && (
          <IconButton
            sx={{
              mr: 1,
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        )}
      </Box>
    </Card>
  )
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
    // In a real app, you would make an API call here
  }

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for songs, artists, or albums"
        value={searchQuery}
        onChange={handleSearch}
        sx={{
          mb: 4,
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.elevated',
            '&:hover': {
              bgcolor: 'background.elevated',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {searchQuery ? (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Songs
          </Typography>
          {songs.map((song) => (
            <SearchResultCard key={song.id} item={song} type="song" />
          ))}

          <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
            Artists
          </Typography>
          {artists.map((artist) => (
            <SearchResultCard key={artist.id} item={artist} type="artist" />
          ))}

          <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
            Albums
          </Typography>
          {albums.map((album) => (
            <SearchResultCard key={album.id} item={album} type="album" />
          ))}
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Browse All
          </Typography>
          <Grid container spacing={2}>
            {['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'R&B', 'Country'].map(
              (genre) => (
                <Grid item xs={6} sm={4} md={3} key={genre}>
                  <Card
                    sx={{
                      bgcolor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                      height: 140,
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.2s ease',
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      {genre}
                    </Typography>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default Search
