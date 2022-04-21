export function generateValidList() {
  return [
    {
      id: '5b1fac3a-265a-4ac4-a393-cd91dd752227',
      name: 'Roberto',
      dateOfBirth: new Date('07/11/1990'),
      appointmentDate: new Date('2022-08-13 14:00'),
      attendance: false,
    },
    {
      id: '39dd02cf-d3e4-41bd-b189-60b1feff06f8',
      name: 'Sandro',
      dateOfBirth: new Date('04/11/1990'),
      appointmentDate: new Date('2022-08-13 14:30'),
      attendance: false,
    },
    {
      id: 'c987ed2e-3b67-488f-80ce-07da39689576',
      name: 'Paula',
      dateOfBirth: new Date('02/11/1990'),
      appointmentDate: new Date('2022-08-09 15:00'),
      attendance: true,
    },
    {
      id: 'c91c89cb-9f79-40b8-b15f-31b9c53eeb69',
      name: 'Aba',
      dateOfBirth: new Date('06/11/1990'),
      appointmentDate: new Date('2022-08-09 15:30'),
      attendance: true,
    },
  ];
}

export function generateExpectedList() {
  return [
    {
      id: '5b1fac3a-265a-4ac4-a393-cd91dd752227',
      name: 'Roberto',
      dateOfBirth: '11/07/1990',
      appointmentDate: '13/08/2022 14:00:00',
      attendance: false,
    },
    {
      id: '39dd02cf-d3e4-41bd-b189-60b1feff06f8',
      name: 'Sandro',
      dateOfBirth: '11/04/1990',
      appointmentDate: '13/08/2022 14:30:00',
      attendance: false,
    },
    {
      id: 'c987ed2e-3b67-488f-80ce-07da39689576',
      name: 'Paula',
      dateOfBirth: '11/02/1990',
      appointmentDate: '09/08/2022 15:00:00',
      attendance: true,
    },
    {
      id: 'c91c89cb-9f79-40b8-b15f-31b9c53eeb69',
      name: 'Aba',
      dateOfBirth: '11/06/1990',
      appointmentDate: '09/08/2022 15:30:00',
      attendance: true,
    },
  ];
}
