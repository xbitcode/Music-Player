import { useState } from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  MoreVert,
  Favorite,
  PlaylistAdd,
  Share,
  Delete,
} from '@mui/icons-material'
import { likedSongs } from '../data/mockData'

const SongItem = ({ song }) => {
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
    <>
      <ListItem
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          borderRadius: 1,
          '&:hover': {
            bgcolor: 'background.elevated',
          },
        }}
        secondaryAction={
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'inline', mr: 2 }}
            >
              {song.duration}
            </Typography>
            <IconButton edge="end" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          {isHovered ? (
            <IconButton
              sx={{
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
          ) : (
            <Avatar variant="square" src={song.cover} alt={song.title} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={song.title}
          secondary={`${song.artist} • ${song.album}`}
          sx={{
            '& .MuiListItemText-primary': {
              color: isHovered ? 'primary.main' : 'text.primary',
            },
          }}
        />
      </ListItem>
      <Divider component="li" />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Favorite />
          </ListItemIcon>
          <ListItemText>Remove from Liked Songs</ListItemText>
        </MenuItem>
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
            <Delete />
          </ListItemIcon>
          <ListItemText>Remove from Library</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

const Liked = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Avatar
          sx={{
            width: 180,
            height: 180,
            bgcolor: 'primary.main',
            mr: 3,
          }}
        >
          <Favorite sx={{ fontSize: 80 }} />
        </Avatar>
        <Box>
          <Typography variant="body1">Playlist</Typography>
          <Typography variant="h3" sx={{ my: 2 }}>
            Liked Songs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {likedSongs.length} songs
          </Typography>
        </Box>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {likedSongs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </List>
    </Box>
  )
}

export default Liked
