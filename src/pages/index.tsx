import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Properties } from 'csstype'
import { Button, Card, Form, InputGroup, ProgressBar, Spinner } from 'react-bootstrap';
import countries, { CountryState } from "@/lib/countries"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_TOKEN, Endpoints } from '@/lib/api';
import { useCountryStates } from '@/hooks/useCountryStates';
import { useWeather } from '@/hooks/useWeather';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/schemas/formSchema"
import { useTimer } from '@/hooks/useTimer';
import ConfirmationModal from '@/components/ConfirmationModal';

const inter = Inter({ subsets: ['latin'] })
const COMPLETION_TIME_MS = 1000

export default function Home() {
  const { remaining, expired } = useTimer(COMPLETION_TIME_MS)
  const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm({ resolver: yupResolver(formSchema) })
  const { countryStates, isLoading: statesLoading } = useCountryStates(watch("country"))
  const { fetchWeather, weather, isLoading: weatherLoading } = useWeather()

  useEffect(() => {
    setValue("temperature", weather?.temp_c)
  }, [weather])


  return (
    <>
      <Head>
        <title>4SidesMX - Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container-fluid vh-100 bg-secondary' style={{'--bs-bg-opacity': '.1'} as Properties}>
        <ConfirmationModal show={expired} />
        <div className='mx-auto my-auto w-25'>
        <Card>
          <Card.Body>
            Tiempo Restante
            <ProgressBar now={remaining / COMPLETION_TIME_MS * 100} visuallyHidden />
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(() => {})} noValidate>
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
                  <Button className='d-block w-100' variant='outline-secondary' onClick={fetchWeather} disabled={expired}>Compartir Ubicacion</Button> :
                  <InputGroup>
                    <InputGroup.Text>
                      <img src={weather.condition.icon} alt={weather.temp_c + "°C"} className='object-fit-none' height={25}/>
                    </InputGroup.Text>
                    <Form.Control type='text' readOnly value={weather.temp_c + "°C"} />
                  </InputGroup>
                }
                { errors.temperature && <small className='text-danger'>{ String(errors.temperature.message) }</small>}
              </Form.Group>
              <Button type='submit' className='w-100'>
                Enviar Formulario
              </Button>
            </Form>
          </Card.Body>
        </Card>
        </div>
      </main>
    </>
  )
}
