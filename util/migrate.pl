#!/usr/bin/perl

use strict;
use DBI;
use Table;

my $dsn = "DBI:mysql:compm001_cmdata_live:10.1.1.5"; # data source name
my $user_name = "root";     # user name
my $password = "abcdefg";   # password
my %attr =                  # attributes
(
  RaiseError => 1,
  PrintError => 0,
  AutoCommit => 1
);

# connect to database
my $dbh = DBI->connect ($dsn, $user_name, $password, \%attr);

print "2+2=",$dbh->selectrow_array("SELECT 2+2"),"\n";

my $table = new Table("user",{Name=>'Name'},1);
$table->create();
# issue query
#my $sth = $dbh->prepare ("SELECT last_name FROM member ORDER BY last_name");
#$sth->execute ();


