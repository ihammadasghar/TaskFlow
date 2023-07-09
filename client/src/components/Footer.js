import { Typography, Divider } from "@mui/material";

const Footer = () => {
    return (
        <footer className="footer">
            <div align="center">
                <Divider sx={{ bgcolor: "primary.main", my: 2 }} />
                <Typography element="p" variant="p" color="primary">Copyright (c) Hammad Asghar. All rights reserved.</Typography>
            </div>

        </footer>
    )
}

export default Footer;