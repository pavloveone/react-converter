import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { TValute, TResponse } from '../../utils/types';
import { checkReponse } from '../../utils/variables';
import { Loading } from '../loading/loading';
import { Error } from '../error/error'
import { ConverterForm } from '../converter-form/converter-form';

function App():JSX.Element {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ hasError: false, errorText: '' })
  const [valute, setValute] = useState<TValute[]>([]);
  
  useEffect(() => {
    fetch('api/valutes')
    .then(res => checkReponse<TResponse>(res))
    .then(res => {
      const { Valute } = res;
      setValute(Valute);
      setIsLoading(false);
    })
    .catch(error => {
      setIsLoading(false);
      setError({ hasError: true, errorText: error.message });
    });
  }, [])
  return (
    <Container className='mx-auto'>
      { !error.hasError && isLoading && (
        <Loading />
      )}
      { !isLoading && error.hasError && (
        <Error message={error.errorText} />
      )}
      { !error.hasError && !isLoading && (
        <ConverterForm valute={valute} />
      )}
    </Container>
  );
}

export default App;
