'use client'
import React, { useState } from 'react'
import { techStacks } from '../techdata'
import { useUser } from '@/components/UserContext'
import Button from '@/components/Button'
import { FaTimes } from 'react-icons/fa'

const AddMoreStacks = () => {
  const { devInfo, setDevInfo } = useUser()
  const [showOptions, setShowOptions] = useState(false)
  const [showOtherInput, setShowOtherInput] = useState(false)
  const [customTech, setCustomTech] = useState('')

  const fieldKey = devInfo.DevField as keyof typeof techStacks
  const allStacks = techStacks[fieldKey] || []
  const selectedStacks = devInfo.DevStack || []

  const addStack = (stack: string) => {
    if (stack.trim() && !selectedStacks.includes(stack)) {
      setDevInfo(prev => ({ ...prev, DevStack: [...selectedStacks, stack.trim()] }))
    }
  }

  const removeStack = (stack: string) => {
    const updated = selectedStacks.filter(s => s !== stack)
    setDevInfo(prev => ({ ...prev, DevStack: updated }))
  }

  const handleCustomTechAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customTech.trim()) {
      addStack(customTech)
      setCustomTech('')
    }
  }

  return (
    <div className="mt-4">
      <Button onclick={() => setShowOptions(!showOptions)} style="text-[16px] w-[140px] h-[25px]">
        {showOptions ? 'Close' : 'Add more+'}
      </Button>

      {/* Show selected tech stacks with remove buttons */}
      {selectedStacks.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedStacks.map(stack => (
            <div
              key={stack}
              className="bg-[#3D3C99] text-white px-2 py-1 rounded-xl flex items-center gap-1"
            >
              <span>{stack}</span>
              <button
                onClick={() => removeStack(stack)}
                className="hover:text-red-400"
                title={`Remove ${stack}`}
              >
                <FaTimes className="text-[16px]" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showOptions && (
        <div className="mt-3 p-3 border rounded-lg shadow-sm max-h-[250px] overflow-y-auto bg-black text-white">
          <h3 className="font-semibold text-lg mb-2">Choose more tech stacks:</h3>
          <div className="grid grid-cols-2 gap-2">
            {allStacks.map(stack => (
              <button
                key={stack}
                onClick={() => addStack(stack)}
                disabled={selectedStacks.includes(stack)}
                className={`py-1 px-2 rounded border ${selectedStacks.includes(stack)
                  ? 'border-gray-600 text-gray-400 cursor-not-allowed'
                  : 'border-[#3D3C99] text-white hover:bg-[#3D3C99]'
                  }`}
              >
                {stack}
              </button>
            ))}
            <button
              onClick={() => setShowOtherInput(true)}
              className="py-1 px-2 rounded border border-dashed border-[#3D3C99] hover:bg-[#3D3C99] col-span-2 text-left"
            >
              + Others (custom)
            </button>
          </div>

          {showOtherInput && (
            <div className="mt-3">
              <input
                type="text"
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                onKeyDown={handleCustomTechAdd}
                placeholder="Enter custom stack & press Enter"
                className="w-full border border-[#3D3C99] rounded px-2 py-1 bg-black text-white"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AddMoreStacks
