import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { ControllerRenderProps } from 'react-hook-form'

interface DateTimePickerProps {
  field: ControllerRenderProps<any, any>
  label?: string
  description?: string
}

const DateTimePicker = ({ field, label, description }: DateTimePickerProps) => {
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      field.onChange(date)
    }
  }

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    const currentDate = field.value || new Date()
    const newDate = new Date(currentDate)

    if (type === 'hour') newDate.setHours(parseInt(value))
    else newDate.setMinutes(parseInt(value))

    field.onChange(newDate)
  }

  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value ? format(field.value, 'MM/dd/yyyy HH:mm') : <span>MM/DD/YYYY HH:mm</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            <Calendar mode="single" selected={field.value} onSelect={handleDateSelect} />
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 24 }, (_, i) => i)
                    .reverse()
                    .map((hour) => (
                      <Button
                        key={hour}
                        size="icon"
                        variant={field.value?.getHours() === hour ? 'default' : 'ghost'}
                        className="sm:w-full shrink-0 aspect-square"
                        onClick={() => handleTimeChange('hour', hour.toString())}
                      >
                        {hour}
                      </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={field.value?.getMinutes() === minute ? 'default' : 'ghost'}
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange('minute', minute.toString())}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}

export default DateTimePicker
