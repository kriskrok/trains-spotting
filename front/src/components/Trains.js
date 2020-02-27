import React, { useState, useEffect } from 'react'
import trainService from '../services/trains'

const Trains = () => {
  const [data, setData] = useState([])

 useEffect(() => {
    trainService.getAll().then(result => {
      setData( sortTrainsByName(result) )
    })
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      trainService.getAll().then(result => {
        setData( sortTrainsByName(result) )
      })
    }, 10000);
    return () => clearInterval(interval);
  }, [])

  const sortTrainsByName = id => id.sort( (a,b) => a.name.localeCompare(b.name) )

  const renderData = () => (
    data.map( (each) => {
      const { name, destination, speed, coordinates, id } = each
      return (
        <tr key={id}>
          <th scope="row">{id}</th>
          <td>{name}</td>
          <td>{destination}</td>
          <td>{speed}</td>
          <td>{coordinates[0]}, {coordinates[1]}</td>
        </tr>
      )
    })
  )
  
  return (
    <div className='container'>
      <table className='table table-hover'>
        <caption>Train data</caption>
        <thead className='thead-dark'>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Destination</th>
            <th scope="col">Speed</th>
            <th scope="col">Coordinates</th>
          </tr>
        </thead>
        <tbody>
            {renderData()}
        </tbody>
      </table>
    </div>
  )
}

export default Trains