import React, { useRef, useState } from 'react'
import { QRCodeSVG } from "qrcode.react";
import { toPng } from 'html-to-image';

function QRCode() {
    const [data, setData] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [url, setUrl] = useState('')

    const qrRef = useRef('')

    const generate = (e) => {
        e.preventDefault()
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
ORG:${company}
URL:${url}
END:VCARD`;

        setData(vCard)

    }

    const download = async () => {
        if (qrRef.current) {
            const dataUrl = await toPng(qrRef.current);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'qrcode.png';
            link.click();
        }
    }

    return (
        <div className='main-container'>
            <div className='section'>
                <div className='form-container'>
                    <div className=''>
                        <p className='title'>Enter the Details</p>
                        <form className='input-form' onSubmit={generate}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                            />
                            <input
                                type="url"
                                placeholder="Website URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                            <button className='bg-blue px-5 py-2 rounded text-white' >Generate</button>
                        </form>
                    </div>
                </div>

                <div className='scanner-container'>
                    {data ?
                        (
                            <div ref={qrRef} className='qr-container'>
                                <p className='scan-text'>Scan QR Code</p>
                                <div className='qrcode'>
                                    <QRCodeSVG
                                        style={{ height: "auto", maxWidth: "200px", width: "200px", }}
                                        renderAs="canvas"
                                        size="400"
                                        value={data}
                                        title='Scan code'
                                        bgColor='#ffffff'
                                    />
                                </div>
                            </div>
                        )
                        : ''}

                    {data && <div>
                        <button onClick={download} className='bg-blue text-white px-5 py-2 rounded'>Download</button>
                    </div>}
                </div>

            </div>
        </div>
    )
}

export default QRCode