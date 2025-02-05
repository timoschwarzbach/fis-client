export type CustomerInformationData = AllData

type AllData = {
  TimeStamp: Value;
  VehicleRef: Value;
  DefaultLanguage: Value;
  TripInformation: TripInformation;
  CurrentStopIndex: IntValue;
  RouteDeviation: string;
  DoorState: string;
  VehicleStopRequested: BoolValue;
  ExitSide: string;
  MovingDirectionForward: BoolValue;
  VehicleMode: string;
  SpeakerActive: BoolValue;
  StopInformationActive: BoolValue;
};

type TripInformation = {
  TripRef: Value;
  StopSequence: StopSequence;
  LocationState: string;
  TimetableDelay: Value;
};

type StopSequence = {
  StopPoints: StopPoint[];
};

export type StopPoint = {
  StopIndex: Value;
  StopRef: Value;
  StopName: Value;
  DisplayContents: DisplayContent[];
};

type DisplayContent = {
  DisplayContentRef: Value;
  LineInformation: LineInformation;
  Destination: Destination;
};

type LineInformation = {
  LineRef: Value;
  LineName: Value;
  LineShortName: Value;
  LineNumber: Value;
};

type Destination = {
  DestinationRef: Value;
  DestinationName: Value;
};

type Value = {
  Value: string;
  Language?: string;
};

type IntValue = {
  Value: number;
};

type BoolValue = {
  Value: boolean;
}