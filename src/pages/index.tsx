import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Properties } from 'csstype'
import { Button, Card, Form, InputGroup, ProgressBar, Spinner } from 'react-bootstrap';
import countries from "@/lib/countries"
import { useEffect, useState } from 'react';
import { useCountryStates } from '@/hooks/useCountryStates';
import { useWeather } from '@/hooks/useWeather';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/schemas/formSchema"
import { useTimer } from '@/hooks/useTimer';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useMediaQuery } from 'react-responsive';

const inter = Inter({ subsets: ['latin'] })
const COMPLETION_TIME_MS = 120000

export default function Home() {
  const { remaining, expired } = useTimer(COMPLETION_TIME_MS)
  const { register, formState: { errors, isValid }, handleSubmit, watch, setValue, getValues } = useForm({ resolver: yupResolver(formSchema) })
  const { countryStates, isLoading: statesLoading } = useCountryStates(watch("country"))
  const { fetchWeather, weather, isLoading: weatherLoading } = useWeather()
  const [showResults, setShowResults] = useState<boolean>(false)
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  useEffect(() => {
    setValue("temperature", weather?.temp_c)
  }, [weather])

  useEffect(() => {
    if (expired) {
      handleSubmit(() => setShowResults(true))
    }
  }, [expired])


  return (
    <>
      <Head>
        <title>4SidesMX - Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container-fluid vh-100 bg-secondary' style={{'--bs-bg-opacity': '.1'} as Properties}>
        <ConfirmationModal show={showResults} values={getValues()} isValid={isValid} />
        <div className={isMobile ? "mt-5 w-100" : "position-absolute start-50 top-50 translate-middle w-25"}>
          <Card className='mb-2'>
            <Card.Body>
              Tiempo Restante
              <ProgressBar now={remaining / COMPLETION_TIME_MS * 100} visuallyHidden />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(() => setShowResults(true))} noValidate>
                <Form.Group className='mb-3'>
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control type='text' {...register("fullname")} isInvalid={!!errors.fullname} disabled={expired} />
                  <Form.Control.Feedback type="invalid">
                    { String(errors.fullname?.message) }
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control type="date" {...register("birthdate")} isInvalid={!!errors.birthdate} disabled={expired} />
                  <Form.Control.Feedback type="invalid">
                    { String(errors.birthdate?.message) }
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Pais</Form.Label>
                  <Form.Select {...register("country")} isInvalid={!!errors.country} disabled={expired}>
                    <option value="">Seleccionar</option>
                    { countries.map(item => <option key={item.value} value={item.text}>{item.text}</option>) }
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    { String(errors.country?.message) }
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Label htmlFor='state-select'>Provincia</Form.Label>
                <InputGroup className='mb-3'>
                  <Form.Select id="state-select"
                    disabled={expired || !countryStates || statesLoading}
                    {...register("state")}
                    isInvalid={!!errors.state}
                  >
                    <option value="">Seleccionar</option>
                    { countryStates?.map((item, idx) => <option key={idx} value={item.state_name}>{item.state_name}</option>) }
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    { String(errors.state?.message) }
                  </Form.Control.Feedback>
                  { statesLoading &&
                    <InputGroup.Text>
                      <Spinner animation="border" variant="primary" size='sm'/>
                    </InputGroup.Text> 
                  }
                </InputGroup>

                <Form.Group className='mb-3'>
                  <Form.Label>Correo Electronico</Form.Label>
                  <Form.Control type='email' {...register("email")} isInvalid={!!errors.email} disabled={expired} />
                  <Form.Control.Feedback type="invalid">
                    { String(errors.email?.message) }
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Clima</Form.Label>
                  { !weather ? 
                    <Button className='d-block w-100' variant='outline-secondary' onClick={fetchWeather} disabled={expired}>
                      { weatherLoading ? <Spinner animation="border" variant="primary" size='sm'/> : "Compartir Ubicacion"}
                    </Button> :
                    <InputGroup>
                      <InputGroup.Text>
                        <img src={weather.condition.icon} alt={weather.temp_c + "°C"} className='object-fit-none' height={25}/>
                      </InputGroup.Text>
                      <Form.Control type='text' readOnly value={weather.temp_c + "°C"} />
                    </InputGroup>
                  }
                  { errors.temperature && <small className='text-danger'>{ String(errors.temperature.message) }</small>}
                </Form.Group>
                { expired ?
                  <Button className='w-100' onClick={() => setShowResults(true)}>Ver resultados</Button>:
                  <Button type='submit' className='w-100'>Finalizar</Button>}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </main>
    </>
  )
}
