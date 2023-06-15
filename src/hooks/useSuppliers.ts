import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { Supplier } from '../data/suppliers'

const useSuppliers = (): [Array<Supplier>, any, any, any] => {
  const socket = useContext(SocketContext)
  const [suppliers, setSuppliers] = useState([] as Array<Supplier>)

  useEffect(() => {
    const receive = (suppliers: Array<Supplier>) => {
      setSuppliers(suppliers)
    }
    socket.on('suppliers', receive)

    return () => {
      socket.off('suppliers', receive)
    }
  }, [socket])

  const editSupplier = (supplier: Supplier) => {
    socket.emit('editSupplier', supplier)
  }

  const addSupplier = (supplier: Supplier) => {
    socket.emit('addSupplier', supplier)
  }

  const refresh = () =>
    socket.emit('suppliers', (suppliers: Supplier[]) => setSuppliers(suppliers))

  return [suppliers, editSupplier, addSupplier, refresh]
}

export default useSuppliers
