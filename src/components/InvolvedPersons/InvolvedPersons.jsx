import React from 'react'
import { useState } from 'react';
import { Group, TextInput, Button, Center, Checkbox } from '@mantine/core';
import { randomId } from '@mantine/hooks';


function InvolvedPersons({ form }) {
    const involvedPersons = form.getValues().involvedPersons.map((item, index) => (
        <Group>
            <TextInput
                placeholder="Name der Person"
                key={form.key(`involvedPersons.${index}.name`)}
                {...form.getInputProps(`involvedPersons.${index}.name`)}
            />
            <TextInput
                placeholder="Addresse der Person"
                key={form.key(`involvedPersons.${index}.address`)}
                {...form.getInputProps(`involvedPersons.${index}.address`)}
            />
            <TextInput
                placeholder="Kennzeichen der Person"
                key={form.key(`involvedPersons.${index}.numberPlate`)}
                {...form.getInputProps(`involvedPersons.${index}.numberPlate`)}
            />
            <Checkbox
                label="Geschädigter"
                key={form.key(`involvedPersons.${index}.isDamaged`)}
                {...form.getInputProps(`involvedPersons.${index}.isDamaged`, { type: 'checkbox' })}
            />
            <Checkbox
                label="Verursacher"
                key={form.key(`involvedPersons.${index}.isCause`)}
                {...form.getInputProps(`involvedPersons.${index}.isCause`, { type: 'checkbox' })}
            />
        </Group>
    ))

    return (
        <>
            {involvedPersons}
            <Group justify="center" mt="md">
                <Button onClick={() => form.insertListItem('involvedPersons', { key: randomId() })}>
                    Neue Person hinzufügen
                </Button>
            </Group>
        </>
    )
}

export default InvolvedPersons