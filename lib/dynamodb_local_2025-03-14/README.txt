README
========

For an overview of DynamoDB Local please refer to the documentation at http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html


Release Notes
-----------------------------

2025-03-14 (2.6.1)
    * Updated dependency versions: aws-sdk-java-third-party-jackson-core from 2.30.21 to 2.31.6, failureaccess from 1.0.2 to 1.0.3, guava from 33.4.0-jre to guava-33.4.7-jre

2025-02-25 (2.6.0)
    * Added support for using Table ARN as table name in several DynamoDB APIs
    * Fixing CreateStreamTable bug on high performance machines, such as Mac M3
    * Upgrading Dependencies to fix vulnerability issues (CVE-2022-49043,CVE-2024-56732, CVE-2020-29582, CVE-2025-21502, CVE-2024-50602, CVE-2025-24970, CVE-2025-25193)

2024-12-12 (2.5.4)
    * Upgrading to Jetty 12.0.14 (Resolves CVE-2024-6763, CVE-2024-8184, CVE-2024-47535)

2024-11-06 (2.5.3)
    * Upgrading Jackson Dependencies to 2.17.x in Log4j Core (Resolves CVE-2022-1471)

2024-06-20 (2.5.2)
    * Bug fix for workflow when update table tries to update table with Billing Mode Ondemand to Provisioned With GSI

2024-06-05 (2.5.1)
    * Fixing a couple of bugs related to OndemandThroughPut

2024-05-28 (2.5.0)
    * Adding support for OndemandThroughPut
    * Adding Telemetry to Embedded Mode
    * Support for ReturnValuesOnConditionCheckFailure for BatchExecuteStatement and ExecuteTransactionRequest
    * Fixing the SDKv2 translation for ConditionalCheckException

2024-04-16 (2.4.0)
    * Support for ReturnValuesOnConditionCheckFailure - Embedded Mode
    * Fix for TrimmedDataAccessException for Operation on Multiple Streams
    * Fixing exception transalation for SDKv2 in Embedded Mode

2024-03-14 (2.3.0)
    * Uprading to Jetty 12.0.2
    * Upgrading to JDK 17
    * Upgrading ANTLR4 to 4.10.1

2024-01-04 (2.2.1)
    * Fixed a bug for Handling of segments in parallel scan

2023-12-14 (2.2.0)
    * Added support of Table delete protection
    * Added support for ReturnValuesOnConditionCheckFailure
    * Added Support for -Version flag

2023-09-28 (2.1.0)
 * Adding Telemetry to DynamoDB Local
 * Dynamically Copy SQLLite Native Libraries for Maven projects
 * Removed io.github.ganadist.sqlite4java library from Maven dependency
 * Upgrading the GoogleGuava to 32.1.1-jre

2023-06-28 (2.0.0)
 * Migrating from javax to jakarta namespace and JDK11 Support
 * Fix for handling invalid access and secret key while server startup
 * Fixing Maven identified vulnerabilities by updating dependencies

2023-06-28 (1.23.0)
  * Fix for handling invalid access and secret key while server startup
  * Fixing Maven identified vulnerabilities by updating dependencies

2023-06-08 (1.22.0)
* Optimize IN clause for PartiQL
* Support for Limit Operation
* M1 support for Maven projects

2023-1-26 (1.21.0)
* Matching Expection for Duplicate items with Web Service for batch-execute-statement operation
* Increase max number of actions to 100
* Upgrading Open JDK on docker to openjdk11

2022-9-12 (1.20.0)

* Fixed path traversal issue
* Updated Jetty dependency to 9.4.48.v20220622
* Added M1 support

2022-7-27 (1.19.0)

 * Updated  IonSQLSandbox dependency to version 6.x
 * Updated  KotlinStdlib dependency to version 1.6.x

2022-1-10 (1.18.0)

 * Updated log4j-core dependency to version 2.17.1.
 * Updated Jackson-core and related libraries from 2.10.x to 2.12.0

2021-12-16 (1.17.2)

 * Updated log4j-core dependency to version 2.16.

2021-12-10 (1.17.1)

 * Updated log4j-core dependency to patch zero-day exploit to prevent remote code execution - Log4Shell: RCE 0-day. Applied internal patch for 2.13.3 for log4j-core by removing JndiLookup class.

2021-10-08 (1.17.0)

 * Update the AWS SDK dependency to AWS SDK for Java 1.12.x
 * Update License.txt file
 * Deprecated Javascript Web Shell

2021-05-03 (1.16.0)

 * Improve the performance of DynamoDbLocal by reducing buffer size to 1KB from 16MB which reduces overall heap memory usage
 * Add a CORS header to DynamoDB local API responses in the case of error responses, which solves the issue of returning generic ResourceNotFoundException for all errors
 * Add support for AWS SDK for Java 2.0
 * Fix wording of the exception messages shown when incorrect attribute definitions are passed in the create table command
2021-02-08 (1.15.0)

  * Add support for PartiQL Select, Update, Insert, Delete Statements
  * Add support for batch reads and writes using PartiQL
  * Add support for transactional reads or writes using PartiQL
  * Fix the shardIterator format to keep the streamArn as part one and serial number as part two to sync with DynamoDB Streams
  * Update the Jackson library dependency from 2.6 to 2.10
  * Fix the error structure difference for message key name in TransactionCanceledException
  * Suppress “Logging initialized” log message shown at server startup

2020-12-21 (1.13.6)

  * Fix the XSS security issue in the DynamoDB JavaScript shell by sanitizing the input and output data
  * Add the log4j-core library dependency with the version update from 2.8 to 2.13.3
  * Fix the describe-stream CLI for the option, —exclusive-start-shard-id, to return basic streaminfo instead of RESOURCE_NOT_FOUND, if the requested shard-id does not match
  * Fix GSI input to not mutate while creating a table with billing mode set to PAY_PER_REQUEST
  * Update the Jetty library dependency version to 9.4.18.v20190429

2020-10-13 (1.13.5)

  * Align error message with Amazon DynamoDB service for empty sets attributes, empty value attributes, and when invalid BETWEEN condition operator range is given
  * Update log4j-api library dependency version to 2.13.3
  * Remove dependency on log4j-core 2.6.2
  * Provide support for multi-arch docker images with arm64 and amd64 architectures

2020-09-14 (1.13.4)

  * Fixes an issue where the “begins_with” conditional function was not working correctly with Binary types for Java versions 9 and later.

2020-08-24 (1.13.3)

  * Fix issues in the begins_with function in key conditions for binary range keys in the Query API.

2020-07-22 (1.13.2)

  * Fix notarization issue caused by running DynamoDB local on macOS Catalina.
  * Bug fix to return only the requested item attributes when a global secondary index is queried with specific attributes.

2020-05-29 (1.13.1)

  * Bugfix to throw validation error when gsi is queried with non projected attribute
  * Bugfix to throw validation error when gsi with projection type other than ALL is queried with option Select as ALL_ATTRIBUTES

2020-05-20 (1.13.0)

  * Support up to 25 unique items and 4 MB of data per TransactWriteItems and TransactGetItems request
  * Support empty values for non-key String and Binary attributes
  * Fix warning log messages when DB is reinitialized
  * Fix error messaging for inconsistent type validations
  * Add shutdownNow API for DynamoDB Local embedded mode
  * Update AWS SDK for Java to version 1.11.780

2020-01-16 (1.12.0)

  * Bugfixes
  * Notarization for running on MacOS Catalina

2019-02-06 (1.11.477)

  * Bugfixes

2019-02-04 (1.11.475)

  * Add on-demand implementation
  * Add support for 20 GSIs (up from 5)
  * Add transaction API implementation
  * Update AWS SDK for Java to version 1.11.475

2017-04-13 (1.11.119)

  * Add TTL implementation
  * Update AWS SDK for Java to version 1.11.119

2017-01-24 (1.11.86)

  * Implement waiters() method in LocalDynamoDBClient
  * Update AWS SDK for Java to version 1.11.86
  * Enable WARN logging for SQLite

2016-05-17_1.0

  * Bug fix for Query validation preventing primary key attributes in query filter expressions

Running DynamoDB Local
---------------------------------------------------------------

java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar [options]

For more information on available options, run with the -help option:

  java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -help
