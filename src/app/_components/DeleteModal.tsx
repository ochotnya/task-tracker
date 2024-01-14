import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '~/shadcn/ui/alert-dialog'
import { Button } from '~/shadcn/ui/button'

type Props = {
  deleteHandler: () => void
}

const DeleteModal = ({ deleteHandler }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex w-20 p-2 justify-center items-center bg-red-700 text-white">
          <FaTrashAlt />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="font-semibold">
          Czy chcesz usunąć to zadanie?
        </AlertDialogHeader>
        <AlertDialogDescription>
          Usuniętego zadania nie można przywrócić
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={deleteHandler}>Usuń</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteModal
