import {
  Container,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  modal: {
    width: '200px',
    height: '40px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#6495ED',
    color: '#ffffff',
    cursor: 'pointer',
  },
})

const Modal = ({ closeModal }) => {
  const classes = useStyles()
  return (
    <div>
      <Container>
        <FormControl>
          <InputLabel htmlFor='my-input'>Email address</InputLabel>
          <Input id='my-input' aria-describedby='my-helper-text' />
          <FormHelperText id='my-helper-text'>
            We'll never share your email.
          </FormHelperText>
          <button onClick={() => closeModal(false)}>x</button>
        </FormControl>
      </Container>
    </div>
  )
}

export default Modal
