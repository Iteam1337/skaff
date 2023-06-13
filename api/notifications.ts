import assert from 'assert'

export async function sendPushNotification({
  to, // expoPushToken
  sound = 'default',
  title,
  body,
  data,
}: {
  to: any[]
  sound?: 'default' | null
  title?: string
  body?: string
  data?: any
}) {
  assert(to.length, 'expoPushToken is required')
  const message = {
    to,
    sound,
    title,
    body,
    data,
  }

  console.log('sending notifications', message)

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
  console.log('sent', to.length, 'notifications')
}
