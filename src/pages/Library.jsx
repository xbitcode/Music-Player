import { useState } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  MoreVert,
  Delete,
  Edit,
  Share,
  PlaylistAdd,
} from '@mui/icons-material'
import { popularPlaylists as playlists, albums, artists } from '../data/mockData'

const LibraryCard = ({ item, type }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          '& .play-button, & .more-button': {
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
          image={type === 'artist' ? item.image : item.cover}
          alt={type === 'artist' ? item.name : item.title}
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
        <IconButton
          className="more-button"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            bgcolor: 'background.paper',
          }}
          onClick={handleMenuOpen}
        >
          <MoreVert />
        </IconButton>
      </Box>
      <CardContent>
        <Typography variant="h6" noWrap>
          {type === 'artist' ? item.name : item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {type === 'artist'
            ? item.followers
            : type === 'album'
            ? `${item.artist} • ${item.year}`
            : `${item.description} • ${item.songCount} songs`}
        </Typography>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PlaylistAdd />
          </ListItemIcon>
          <ListItemText>Add to Playlist</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  )
}

const Library = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Library
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Playlists" />
        <Tab label="Albums" />
        <Tab label="Artists" />
      </Tabs>

      <Grid container spacing={2}>
        {activeTab === 0 &&
          playlists.map((playlist) => (
            <Grid item key={playlist.id} xs={12} sm={6} md={3}>
              <LibraryCard item={playlist} type="playlist" />
            </Grid>
          ))}

        {activeTab === 1 &&
          albums.map((album) => (
            <Grid item key={album.id} xs={12} sm={6} md={3}>
              <LibraryCard item={album} type="album" />
            </Grid>
          ))}

        {activeTab === 2 &&
          artists.map((artist) => (
            <Grid item key={artist.id} xs={12} sm={6} md={3}>
              <LibraryCard item={artist} type="artist" />
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}

export default Library
