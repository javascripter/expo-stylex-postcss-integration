import { Example } from '@/components/Example'
import { html, css } from 'react-strict-dom'

export default function Index() {
  return (
    <html.div style={styles.root}>
      <html.div>Edit app/index.tsx to edit this screen.</html.div>
      <Example />
    </html.div>
  )
}

const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
})
