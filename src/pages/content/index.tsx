import { createRoot } from 'react-dom/client'
import { getCourses } from '@src/service'
import App from '@src/pages/content/App'
import { ThemeProvider, createTheme } from '@mui/material'
const root = document.createElement('div')
root.id = 'root'
document.body.append(root)

const modal = document.createElement('div')
modal.id = 'modal'
document.body.append(modal)

const theme = createTheme({
    typography:{
        fontFamily:[

        ]
    }
});

createRoot(root).render(
    <ThemeProvider theme={theme}>   
        <App />
    </ThemeProvider>
);