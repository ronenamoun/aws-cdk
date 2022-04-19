#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SampleCdkStack } from '../lib/sample_cdk-stack';
import {VpcStack} from "../lib/vpc-stack";
import { RDSStack } from '../lib/rds-stack';
const app = new cdk.App();

new SampleCdkStack(app, 'SampleCdkStack');
//create vpc 
const vpcStackEntity  = new VpcStack(app, 'VpcStack');

new RDSStack(app, 'RDSStack', {
  vpc: vpcStackEntity.vpc
});