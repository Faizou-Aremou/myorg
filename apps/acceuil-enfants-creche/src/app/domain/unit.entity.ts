import { Email } from '@web-times-team/util-functionnal';
import { Sequence } from '@web-times-team/util-sequence';

export type Unit = {
  readonly id: UnitId;
  readonly name: UnitName;
  readonly children: Children;
  readonly employees: Employees;
  readonly rooms: Rooms;
  readonly nurseries: Nurseries;
};

export type UnitId = string;
export type UnitName = string;
export type Children = Sequence<Child>;
export type Employees = Sequence<Employee>;
export type Employee = Person & {
  role: Role;
};
export type Child = {
  readonly id: ChildId;
  readonly name: Name;
  readonly birthday: Date;
  readonly Parent1: Parent;
  readonly Parent2: Parent;
  readonly anotherContacts: Contacts;
  readonly physicalDescription: PhysicalDescription;
  readonly annualNumberOfScheduledChildcare: Day;
  readonly childcareRecords: ChildcareRecords;
};

export type ChildId = string;

export type Name = {
  readonly first: string;
  readonly last: string;
};
export type Parent = Person;
export type Person = {
  readonly id: PersonId;
  readonly name: Name;
  readonly phone1: Phone;
  readonly phone2: Phone;
  readonly email: Email;
};
export type PersonId = string;
export type Contacts = Sequence<Contact>;
export type Contact = Person;
export type PhysicalDescription = {
  readonly weight: Kilogram;
  readonly size: Centimeter;
};
export type ChildcareRecords = Sequence<ChildcareRecord>;
export type ChildcareRecord = {
  readonly date: Date;
  readonly welcomeHour: Hour;
};
export type Rooms = Sequence<Room>;
export type Room = {
  readonly areas: squareMeter;
  readonly material: Materials;
};
export type Nurseries = Sequence<Nursery>;
export type Nursery = FamilyNursery | CollectiveNursery;
export type capacityOfReception = { readonly children: Children };
export type MaternalAssistance = Person & undefined;

export type Role = undefined;
export type Hour = number;

export type FamilyNursery = capacityOfReception & {
  readonly id: NurseryId;
  readonly maternalAssistance: MaternalAssistance;
};
export type CollectiveNursery = capacityOfReception & {
  readonly id: NurseryId;
  readonly numberOfDaysOfChildcare: NumberOfDaysOfChildcare;
};

export type NurseryId = string;
export type NumberOfDaysOfChildcare = number;

export type squareMeter = number;
export type Material = undefined;
export type Kilogram = number;
export type Day = number;
export type Centimeter = number;
export type Phone = string;

export type Materials = Sequence<Material>;
