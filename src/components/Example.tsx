import { html, css } from 'react-strict-dom'
import { Colors } from '../styles/colors.stylex'

export function Example() {
  // Update the styles here to see the changes in the browser with Fast Refresh
  // You can also try changing the text inside the div, or changing CSS variables.
  return <html.div style={styles.example}>Example</html.div>
}

const styles = css.create({
  example: {
    borderRadius: 8,
    color: 'white',
    backgroundColor: Colors.primary,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
})
