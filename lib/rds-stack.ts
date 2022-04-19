import {App, Duration, Stack, StackProps } from 'aws-cdk-lib';
import {Credentials, DatabaseInstance, DatabaseInstanceEngine, OracleEngineVersion, StorageType}   from 'aws-cdk-lib/aws-rds';
import { InstanceClass, InstanceSize, InstanceType, Peer, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import {ISecret, Secret} from 'aws-cdk-lib/aws-secretsmanager';


export interface RDSStackProps extends StackProps {
    vpc: Vpc;
}

export class RDSStack extends Stack {

    readonly secret: ISecret;
    readonly mySQLRDSInstance: DatabaseInstance;

    constructor(scope: App, id: string, props: RDSStackProps) {
        super(scope, id, props);

    const instance = new DatabaseInstance(this, 'mysql-rds-instance', {
    engine: DatabaseInstanceEngine.MYSQL,
    // optional, defaults to m5.large
    instanceType: InstanceType.of(InstanceClass.BURSTABLE3, InstanceSize.MICRO),
    credentials: Credentials.fromGeneratedSecret('syscdk'), // Optional - will default to 'admin' username and generated password
    vpc:props.vpc,
    vpcSubnets: {
        subnetType: SubnetType.PRIVATE_ISOLATED,
    },
    deletionProtection: false,
    databaseName: 'Reporting',
    multiAz: false,
    port: 3306
    });

    }
}