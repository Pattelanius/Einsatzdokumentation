import React from 'react'
import { TextInput, TagsInput, Textarea, FileInput } from '@mantine/core';


function MissionDetails({ form }) {
    const vehicles = ['KdoW', 'ELW 1', 'MTW', 'LF 20', 'LF 10/6', 'DLAK', 'GW-LZA']

    return (
        <>
            <TextInput
                label="Aktenzeichen der Polizei"
                placeholder="Aktenzeichen der Polizei"
                key={form.key('policeDocumentNumber')}
                {...form.getInputProps('policeDocumentNumber')}
            />
            <TagsInput
                label="Ausgerückte Fahrzeuge"
                placeholder="Ausgerückte Fahrzeuge"
                data={vehicles}
                key={form.key('usedVehicles')}
                {...form.getInputProps('usedVehicles')}
            />
            <Textarea
                label="Einsatzdetails"
                placeholder="Einsatzdetails"
                autosize
                minRows={2}
                maxRows={10}
                key={form.key('missionText')}
                {...form.getInputProps('missionText')}
            />
            <FileInput multiple accept="image/png,image/jpeg" label="Fotos des Einsatzes" placeholder="Fotos des Einsatzes" 
                key={form.key('missionPictures')}
                {...form.getInputProps('missionPictures')}
            />
        </>
    )
}

export default MissionDetails