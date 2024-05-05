import {Xumm} from 'xumm'
import {useState} from "react";
import './navbar.scss'
import {convertStringToHex} from 'xrpl';

const xumm = new Xumm(import.meta.env.VITE_XAMAN_API_KEY)

const Wallet = ({setUser}) => {
    const [account, setAccount] = useState('')

    xumm.user.account.then(a => {
        setUser(a ?? '');
        setAccount(a ?? '')
    })

    console.log(account);
    const logout = () => {
        xumm.logout()
        setUser('');
        setAccount('')
    }



    const shortenedAddress = account ?  account?.substring(0, 2) + "..." + account?.substring(account?.length - 5) : '';

    return (
        <>
            <button className={"wallet-bar"}>
                <p className={"ellipsis"}>{shortenedAddress}</p>
                {
                    account === '' && !xumm.runtime.xapp
                        ? <button className={"button-sign"} onClick={xumm.authorize}>Sign in</button>
                        : ''
                }
                {
                    account !== ''
                        ? <>
                            <button onClick={logout}>Sign Out</button>
                        </>
                        : ''
                }
            </button>
        </>
    )
}

export default Wallet;
