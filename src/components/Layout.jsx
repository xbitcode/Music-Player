import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Home,
  Search,
  LibraryMusic,
  Favorite,
  Add,
  Menu as MenuIcon,
  ChevronLeft,
} from '@mui/icons-material'

const drawerWidth = 240

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'Search', icon: <Search />, path: '/search' },
  { text: 'Your Library', icon: <LibraryMusic />, path: '/library' },
  { text: 'Liked Songs', icon: <Favorite />, path: '/liked' },
]

const playlists = [
  'Rock Classics',
  'Chill Vibes',
  'Workout Mix',
  'Study Music',
  'Party Hits',
]

const Layout = ({ children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ bgcolor: 'background.default', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'text.primary' }}>
          Music Player
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'text.primary' }}>
            <ChevronLeft />
          </IconButton>
        )}
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path)
                if (isMobile) {
                  handleDrawerToggle()
                }
              }}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'background.elevated',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'text.primary' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ px: 2, mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Add />
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
            Create Playlist
          </Typography>
        </Box>

        <List>
          {playlists.map((playlist) => (
            <ListItem key={playlist} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={playlist}
                  sx={{ color: 'text.secondary' }}
                  primaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 8,
            left: 8,
            zIndex: 1200,
            display: { sm: 'none' },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.default',
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mb: '90px', // Space for the player
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout
