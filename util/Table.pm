#!/usr/bin/perl

package Table;
sub new
{
  my $class = shift;
  my $self = {
    _tableName  => shift,
    _schema => shift,
    _autoIncrement => shift
  };

  @schema = (
    {name=>'abc', type=>'def'},
    {name=>'zyx', type=>'uvw'},
    {name=>'zyx1', type=>'uvw'}
  );

  $self->{_schema} = @schema;
  foreach my $member ($self->{_schema}){
    print "name : $member->{name}\n";
  }
  print "@schema\n";

  print "tableName is $self->{_tableName}\n";
  bless ($self, $class);
  return $self;
}

sub create{
  my($table) = @_;
  print "Going to create a new Table: ".$table->{_tableName}."\n";
  print "Table Schema:\n";

  
  @schema = $table->{_schema};
  foreach (@schema){
    print "Name $_->{name}\n";
  }
  

}

1;
