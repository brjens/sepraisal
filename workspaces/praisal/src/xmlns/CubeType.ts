export enum CubeType {
    CubeBlock = 'CubeBlock',
    Conveyor = 'Conveyor',
    ConveyorConnector = 'ConveyorConnector',
    LandingGear = 'LandingGear',
    Thrust = 'Thrust',
    AirVent = 'AirVent',
    AirtightSlideDoor = 'AirtightSlideDoor',
    Beacon = 'Beacon',
    Gyro = 'Gyro',
    OreDetector = 'OreDetector',
    MedicalRoom = 'MedicalRoom',
    InteriorLight = 'InteriorLight',
    CargoContainer = 'CargoContainer',
    OxygenGenerator = 'OxygenGenerator',
    OxygenTank = 'OxygenTank',
    Reactor = 'Reactor',
    Refinery = 'Refinery',
    Assembler = 'Assembler',
    TextPanel = 'TextPanel',
    Cockpit = 'Cockpit',
    TimerBlock = 'TimerBlock',
    ProgrammableBlock = 'MyProgrammableBlock',
    ButtonPanel = 'ButtonPanel',
}

// tslint:disable-next-line: naming-convention no-object-literal-type-assertion
export const CubeTypePrefixed = {
    [CubeType.CubeBlock]: 'MyObjectBuilder_CubeBlock',
    [CubeType.Conveyor]: 'MyObjectBuilder_Conveyor',
    [CubeType.ConveyorConnector]: 'MyObjectBuilder_ConveyorConnector',
    [CubeType.LandingGear]: 'MyObjectBuilder_LandingGear',
    [CubeType.Thrust]: 'MyObjectBuilder_Thrust',
    [CubeType.AirVent]: 'MyObjectBuilder_AirVent',
    [CubeType.AirtightSlideDoor]: 'MyObjectBuilder_AirtightSlideDoor',
    [CubeType.Beacon]: 'MyObjectBuilder_Beacon',
    [CubeType.Gyro]: 'MyObjectBuilder_Gyro',
    [CubeType.OreDetector]: 'MyObjectBuilder_OreDetector',
    [CubeType.MedicalRoom]: 'MyObjectBuilder_MedicalRoom',
    [CubeType.InteriorLight]: 'MyObjectBuilder_InteriorLight',
    [CubeType.CargoContainer]: 'MyObjectBuilder_CargoContainer',
    [CubeType.OxygenGenerator]: 'MyObjectBuilder_OxygenGenerator',
    [CubeType.OxygenTank]: 'MyObjectBuilder_OxygenTank',
    [CubeType.Reactor]: 'MyObjectBuilder_Reactor',
    [CubeType.Refinery]: 'MyObjectBuilder_Refinery',
    [CubeType.Assembler]: 'MyObjectBuilder_Assembler',
    [CubeType.TextPanel]: 'MyObjectBuilder_TextPanel',
    [CubeType.Cockpit]: 'MyObjectBuilder_Cockpit',
    [CubeType.TimerBlock]: 'MyObjectBuilder_TimerBlock',
    [CubeType.ProgrammableBlock]: 'MyObjectBuilder_MyProgrammableBlock',
    [CubeType.ButtonPanel]: 'MyObjectBuilder_ButtonPanel',
} as const

// tslint:disable-next-line: naming-convention no-object-literal-type-assertion
export const CubeTypePrefixedDefinition = {
    [CubeType.CubeBlock]: 'MyObjectBuilder_CubeBlockDefinition',
    [CubeType.Conveyor]: 'MyObjectBuilder_ConveyorDefinition',
    [CubeType.ConveyorConnector]: 'MyObjectBuilder_ConveyorConnectorDefinition',
    [CubeType.LandingGear]: 'MyObjectBuilder_LandingGearDefinition',
    [CubeType.Thrust]: 'MyObjectBuilder_ThrustDefinition',
    [CubeType.AirVent]: 'MyObjectBuilder_AirVentDefinition',
    [CubeType.AirtightSlideDoor]: 'MyObjectBuilder_AirtightSlideDoorDefinition',
    [CubeType.Beacon]: 'MyObjectBuilder_BeaconDefinition',
    [CubeType.Gyro]: 'MyObjectBuilder_GyroDefinition',
    [CubeType.OreDetector]: 'MyObjectBuilder_OreDetectorDefinition',
    [CubeType.MedicalRoom]: 'MyObjectBuilder_MedicalRoomDefinition',
    [CubeType.InteriorLight]: 'MyObjectBuilder_InteriorLightDefinition',
    [CubeType.CargoContainer]: 'MyObjectBuilder_CargoContainerDefinition',
    [CubeType.OxygenGenerator]: 'MyObjectBuilder_OxygenGeneratorDefinition',
    [CubeType.OxygenTank]: 'MyObjectBuilder_OxygenTankDefinition',
    [CubeType.Reactor]: 'MyObjectBuilder_ReactorDefinition',
    [CubeType.Refinery]: 'MyObjectBuilder_RefineryDefinition',
    [CubeType.Assembler]: 'MyObjectBuilder_AssemblerDefinition',
    [CubeType.TextPanel]: 'MyObjectBuilder_TextPanelDefinition',
    [CubeType.Cockpit]: 'MyObjectBuilder_CockpitDefinition',
    [CubeType.TimerBlock]: 'MyObjectBuilder_TimerBlockDefinition',
    [CubeType.ProgrammableBlock]: 'MyObjectBuilder_MyProgrammableBlockDefinition',
    [CubeType.ButtonPanel]: 'MyObjectBuilder_ButtonPanelDefinition',
} as const


export const addCubeTypePrefix = <T extends CubeType>(plain: T): typeof CubeTypePrefixed[T] =>
    `MyObjectBuilder_${String(plain)}` as typeof CubeTypePrefixed[T]
