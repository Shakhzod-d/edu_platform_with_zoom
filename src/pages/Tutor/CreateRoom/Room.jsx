import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import React from 'react'
import { useParams } from 'react-router-dom'

export const Room = () => {
  const { roomId } = useParams()

  const myMeeting = async (element) => {
    const appId = 1806639770
    const serverSecret = `28797b669984fafee3a2c2418ebd0357`

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      Date.now().toString(),
      `John Doe`
    )

    const zp = ZegoUIKitPrebuilt.create(kitToken)
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    })
  }

  return (
    <div>
      <div ref={myMeeting}></div>
    </div>
  )
}
