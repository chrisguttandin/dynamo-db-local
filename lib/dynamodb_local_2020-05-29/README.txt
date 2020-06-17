README
========

For an overview of DynamoDB Local please refer to the documentation at http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html


Release Notes
-----------------------------
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
