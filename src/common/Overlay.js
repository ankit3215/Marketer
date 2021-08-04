import { Box, Container, Fade, makeStyles } from "@material-ui/core";
import { createPortal } from "react-dom";

const style = makeStyles(() => ({
    Box: {
        background: 'rgba(0,0,0,0.65)',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1400,
    },
}))

export default function Overlay({status,children, onClose, size="md"}) {
    const classes = style();
    console.log("rendered");
    const handleClick = (e) => {
        if(e.target === e.currentTarget){
            onClose(e);
        }
    }

    return (
        <>
        { createPortal(
            <Fade in={status}>
                <Box
                className={classes.Box}
                component="div"
                onClick={handleClick}>
                    <Container maxWidth={size}>
                        {status && children}
                    </Container> 
                </Box>
            </Fade>
            , document.body)
        }
        </>
    )
}


