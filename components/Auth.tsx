import { useState } from 'react'
import { supabase } from '../utils/SupabaseClient'
import {getErrorMessage} from "../utils/ErrorUtil";



const Auth = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (email: string) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({ email })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            alert(getErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <div>
                    <input
                        className="inputField"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin(email)
                        }}
                        className="button block"
                        disabled={loading}
                    >
                        <button className="btn btn-outline btn-primary">{loading ? 'Loading'

                            :

                            'Send magic link'}</button>
                    </button>
                </div>
            </div>
        </div>


    );
}

export default Auth
