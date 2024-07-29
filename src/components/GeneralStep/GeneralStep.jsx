import React from 'react'
import { useState } from 'react';
import { TextInput, Autocomplete } from '@mantine/core';
import { TimeInput } from '@mantine/dates';

function GeneralStep({ form }) {
    const missionKeyWords = ['B:Klein', 'B:Pkw', 'B:Lkw', 'B:Schornstein', 'B:Gebäude klein', 'B:Gebäude groß', 'B:Sonderobjekt', 'B:BMA', 'B:Fläche', 'B:Wald', 'B:Wald groß', 'B:Wald im WSP', 'B:Schiene', 'B:Boot', 'B:Schiff', 'B:Gefahrgut', 'B:Kleinflugzeug', 'B:Großflugzeug', 'B:Explosion', 'H:Klein', 'H:Natur', 'H:Hilfeleistung', 'H:Türnotöffnung', 'H:VU ohne P', 'H:VU mit P', 'H:VU Klemm', 'H:VU LKW/Bus', 'H:VU Schiene', 'H:VU Schiff', 'H:Flugzeugunfall', 'H:Person auf Schiene', 'H:Person im Wasser / Eis', 'H:Rettung aus Höhen oder Tiefen', 'H:Gas', 'H:Gefahrgut klein', 'H:Gefahrgut groß', 'H:Einsturz', 'H:Öl Land', 'H:Öl auf Wasser', 'H:Tier in Not', 'H:Kommunal', 'H:Person-TMR']

    return (
        <>
            <TextInput
                key={form.key('missionKey')} label="Einsatznummer" {...form.getInputProps('missionKey')} />

            <TimeInput
                key={form.key('startedAt')}
                label="Wann begann der Einsatz?"
                {...form.getInputProps('startedAt')}
            />
            <TimeInput
                key={form.key('endedAt')}
                label="Wann endete der Einsatz?"
                {...form.getInputProps('endedAt')}
            />
            <TextInput
                key={form.key('missionLeader')} label="Wer war der Einsatzleiter?" {...form.getInputProps('missionLeader')} />
            <Autocomplete
                key={form.key('missionKeyword')}
                label="Einsatzstichwort"
                placeholder="Wähle das Einsatzstichwort"
                data={missionKeyWords}
                {...form.getInputProps('missionKeyword')}
            />
            <TextInput
                key={form.key('missionLocation')} label="Einsatzort" description="Addresse, Ort" {...form.getInputProps('missionLocation')} />
        </>
    )
}

export default GeneralStep