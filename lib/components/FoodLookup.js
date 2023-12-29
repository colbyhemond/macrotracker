import {useState} from 'react'


const FoodLookup = () => {
    const [apiStatus, setApiStatus] = useState('🔴')
    const [jwt, setJwt] = useState(null)
    const [results, setResults] = useState(null)

    const handleGetAuthToken = async () => {

        fetch('/api/nutrition', {
            method: 'POST'
        })
        .then(response=>response.json())
        .then(data=> {
            console.log(data);
            if (data) {
                setJwt(data.access_token)
                setApiStatus('🟢')
            } else {
                console.log('something happened');
            }
            
        })
        .catch(error=> {
            console.log(error);
        })
    }

    return (<>
        <div className='flex flex-col items-center'>
            <div onClick={handleGetAuthToken} className='pb-10'>
                Status: {apiStatus}
            </div>
            <div>
                <div className="form-control pb-10">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                    </div>
                </div>
            <div className='border rounded min-w-[300px]'>
                {results ? (
                    <div>data found</div>
                ) : (
                    <div className='text-center p-2'>No Data</div>
                )}
            </div>
        </div>
        
    </>)
}

export default FoodLookup