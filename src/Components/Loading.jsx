import { dotSpinner } from 'ldrs'

dotSpinner.register()

export default function Loading() {

    return (
        <l-dot-spinner
      size="100"
      speed="0.9" 
      color="black" 
    ></l-dot-spinner>
    )
}
