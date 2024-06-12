import {useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import {login} from "../apiServices/authApiServices.ts";
import Spinner from "../components/Spinner.tsx";

const Login = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''})
    const [isLoading, setIsLoading] = useState(false);
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState({email: [], password: []});
    const [allertError, setAllertError] = useState('');
    const clearErrors = (field: string) => {
        setAllertError('');
        setErrors({...errors, [field]: []});
    };
    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const {data} = await login(credentials);
            setUser(data.user);
            setToken(data.access_token)
            setIsLoading(false)
        } catch (error) {
            // @ts-ignore
            const resp = error.response;
            setIsLoading(false);
            if (resp && resp.status === 422) {
                const {email, password} = resp.data.errors;
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ...(email ? {email} : {}),
                    ...(password ? {password} : {})
                }));
            }
            if (resp && resp.status !== 422) {
                const {error} = resp.data;
                setAllertError(error);
            }
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-xl font-medium leading-9 tracking-tight text-gray-900">Вас вітає
                    ІС "Центр дошкільного розвитку"</h2>
                <p className="mt-10 text-center text-sm leading-9 tracking-tight text-gray-900">Спочатку необхідно
                    авторизуватись</p>
            </div>
            {allertError !== '' ?
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <p className="font-bold">Помилка!</p>
                    <p>{allertError}</p>
                </div>
                : ''

            }

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email"
                               className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email"
                                   value={credentials.email}
                                   onChange={e => {
                                       clearErrors('email');
                                       setCredentials(credentials => ({...credentials, email: e.target.value}));
                                   }}
                                   className={`block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errors.email?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'}`}/>
                        </div>
                        {errors.email.length > 0 && (
                            <div className="text-red-500 text-xs">
                                {errors.email.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password"
                               className="block text-sm font-medium leading-6 text-gray-900">Пароль</label>

                        <div className="mt-2">
                            <input id="password" name="password" type="password"
                                   value={credentials.password}
                                   onChange={e => {
                                       clearErrors('password');
                                       setCredentials(credentials => ({...credentials, password: e.target.value}));
                                   }}
                                   className={`block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errors.password?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'}`}/>
                        </div>
                        {errors.password.length > 0 && (
                            <div className="text-red-500 text-xs">
                                {errors.password.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <button type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {isLoading ? (
                                <Spinner />
                            ) : (
                                "Увійти"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
