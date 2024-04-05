import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    ".MuiOutlinedInput-notchedOutline": {
                        minHeight: 60,
                        borderRadius: 15,
                        outline: 'none',
                        paddingLeft: 15,
                        border: '2px solid #2C66AE70',
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: '.149rem solid #599beb'
                    },
                    "&:focus .MuiOutlinedInput-notchedOutline": {
                        border: '.149rem solid #599beb'
                    }
                }
            }
        }
    }
});