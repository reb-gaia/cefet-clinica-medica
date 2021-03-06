import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSchedule } from '../../hooks/contexts/ScheduleProvider'
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function CardSchedule({schedule}) {
  const history = useHistory();

  const { deleteSchedule } = useSchedule();
  const handleDelete = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Você deseja esse agendamento?',
      text: "Caso exclua, será permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, quero excluir!',
      cancelButtonText: 'Não, quero cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSchedule({id: schedule.id});
        swalWithBootstrapButtons.fire(
          'Excluido!',
          'O agendamento foi excluido!',
          'Sucesso'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'O agendamento foi excluido!',
          'Error'
        )
      }
    })
  };

  const handleEdit = async () => {
    history.push(`edit-schedule/${schedule.id}`, {schedule});
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{schedule.nome}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{schedule.data} às {schedule.horario}</Card.Subtitle>
        
      </Card.Body>
    </Card>
  );
}

export default CardSchedule;