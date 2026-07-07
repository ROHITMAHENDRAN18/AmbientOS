# AmbientOS Database Design

## Tables

1. users

2. rooms

3. devices

4. automation_rules

5. events

6. notifications
 ## users

user_id

name

email

password

role

created_at
## rooms

room_id

room_name

room_type

## devices

device_id

device_name

device_type

room_id

status

created_at

## automation_rules

rule_id

rule_name

condition

action

status

## events

event_id

device_id

event_type

time

description

## notifications

notification_id

title

message

status

created_at