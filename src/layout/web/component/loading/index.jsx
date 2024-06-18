import React from 'react'
import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import LoadingLottie from '../../../../../public/assets/lotties/loading.json'
export default function LoadingComponent() {
    const { loading } = useSelector((state) => state.general);

    return (
        <div style={{
            zIndex: '99999999',
            width: '100%', height: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: .5,
            backgroundColor:'black'
        }}>
            <Lottie options={{
                loop: true,
                autoplay: true,
                animationData: LoadingLottie,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            }}
                height={250}
                width={250}
            />
        </div>
    )
}
