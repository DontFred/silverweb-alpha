import { Text } from '@nextui-org/react'

export default function Copyright() {
  return (
    <Text size={11} css={{color: 'Grey', position: "fixed", zIndex: 2000, right: 10, bottom: 10 }}>© {new Date().getFullYear()} SilverBack Staffing Ltd. All rights reserved.</Text>
  )
}
