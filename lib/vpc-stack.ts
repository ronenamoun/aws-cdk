import {App,Stack,StackProps} from 'aws-cdk-lib';
import {Peer,Port,SecurityGroup,SubnetType,Vpc} from 'aws-cdk-lib/aws-ec2';


export class VpcStack extends Stack {
    readonly vpc: Vpc;
    readonly ingressSecurityGroup: SecurityGroup;
    readonly egressSecurityGroup: SecurityGroup;

    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);
        //test
        //Place resource definitions here.
        this.vpc = new Vpc(this, 'CustomVPC', {
            cidr: '10.0.0.0/16',
            maxAzs: 2,
            subnetConfiguration: [{
                cidrMask: 26,
                name: 'isolatedSubnet',
                subnetType: SubnetType.PRIVATE_ISOLATED,
            }],
            natGateways: 0
        });

        this.ingressSecurityGroup = new SecurityGroup(this, 'ingress-security-group', {
            vpc: this.vpc,
            allowAllOutbound: false,
            securityGroupName: 'IngressSecurityGroup',
        });
        this.ingressSecurityGroup.addIngressRule(Peer.ipv4('10.0.0.0/16'), Port.tcp(3306));
        
        this.egressSecurityGroup = new SecurityGroup(this, 'egress-security-group', {
            vpc: this.vpc,
            allowAllOutbound: false,
            securityGroupName: 'EgressSecurityGroup',
        });
        this.egressSecurityGroup.addEgressRule(Peer.anyIpv4(), Port.tcp(80));

        

    }
}